import { FormEvent, useState } from 'react'
import { Video } from '../../utils/interfaces'
import './styles.css'

const apiKey = 'AIzaSyBY28CKWruqrIyXKW9wDfO1Uhx-sAcjCnQ'

interface Props {
    setSearchResults: React.Dispatch<React.SetStateAction<Video[]>>
}

const VideoSearchForm: React.FC<Props> = ({ setSearchResults }) => {
    const [search, setSearch] = useState('')

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (!search) return
        e.preventDefault()
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search.replaceAll(' ', '%20')}&key=${apiKey}`

        try {
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

    const className = 'VideoSearchForm'
    return (
        <form className={className} onSubmit={handleFormSubmit}>
            <input type="text" name="search" id="search" value={search} className={`${className}_input`} placeholder='Recipe Search' onChange={e => setSearch(e.target.value)} autoComplete='off' />
            <input type="submit" value="Submit" className={`${className}_submit`} />
        </form>
    )
}

export default VideoSearchForm