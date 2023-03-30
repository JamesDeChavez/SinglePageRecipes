import { useQuery } from '@apollo/client'
import { FormEvent, useState, useContext } from 'react'
import { CreateRecipeRenderContext } from '../../branches/CreateRecipe'
import { GET_YOUTUBE_KEY } from '../../graphql/queries'
import { Video } from '../../utils/interfaces'
import './styles.css'

interface Props {
    setSearchResults: React.Dispatch<React.SetStateAction<Video[]>>
}

const VideoSearchForm: React.FC<Props> = ({ setSearchResults }) => {
    const { setVideoSelected } = useContext(CreateRecipeRenderContext)
    const { data } = useQuery(GET_YOUTUBE_KEY)
    const [search, setSearch] = useState('')

    const isValidUrl = (urlString: string) => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!search) return
        const apiKey = data.youtubeKey
        let videoId= ''
        let url = ''

        if (isValidUrl(search)) {
            videoId = search.split('?v=')[1].split('&')[0]
            url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`
            try {
                const res = await fetch(url);
                const data = await res.json();
                const newVideoState: Video = {
                    title: data.items[0].snippet.title,
                    thumbnail: data.items[0].snippet.thumbnails.medium,
                    channel: data.items[0].snippet.channelTitle,
                    videoId: data.items[0].id
                };
                setVideoSelected(newVideoState);
            } catch (error) {
                console.log(error);
            };
            
        } else {
            try {
                url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${search.replaceAll(' ', '%20')}&key=${apiKey}`
                const res = await fetch(url)
                const data = await res.json()            
                const newSearchResults: Video[] = data.items.map((video: any) => {
                    return ({
                        title: video.snippet.title,
                        thumbnail: video.snippet.thumbnails.medium.url,
                        channel: video.snippet.channelTitle,
                        videoId: video.id.videoId
                    })
                });            
                setSearchResults(newSearchResults)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const className = 'VideoSearchForm'
    return (
        <form className={className} onSubmit={handleFormSubmit}>
            <input 
                type="text" name="search" id="search" value={search} 
                className={`${className}_input`} placeholder='Youtube Search or URL' 
                onChange={e => setSearch(e.target.value)} autoComplete='off' 
            />
            <input type="submit" value="Search" className={`${className}_submit`} />
        </form>
    )
}

export default VideoSearchForm