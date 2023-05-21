import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ReactComponent as PlusSVG  } from '../../assets/square-plus-regular.svg'
import { ReactComponent as MinusSVG  } from '../../assets/square-minus-regular.svg'
import './styles.css'
import classNames from 'classnames'

interface Props {
    title: string,
    videoId: string,
    handleMinusClick: (e: React.MouseEvent<SVGElement, MouseEvent>) => void,
    handlePlusClick: (e: React.MouseEvent<SVGElement, MouseEvent>) => void,
    currentView: string
}

const VideoSection: React.FC<Props> = ({ title, videoId, handleMinusClick, handlePlusClick, currentView }) => {
    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_iframe`,{x: -1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'VideoSection'
    return (
        <div className={className} ref={root} >
            <div className={`${className}_topContainer`}>
                <p className={classNames(
                    `${className}_header`,
                    {[`${className}_header_hideView`]: currentView === 'HIDE'}
                )}>{`RECIPE: ${title}`}</p>
                <div className={`${className}_buttonsContainer`} >
                    <MinusSVG  className={classNames(
                        `${className}_minusIcon`,
                        {[`${className}_minusIcon_hideView`]:  currentView === 'HIDE'}
                    )} onClick={handleMinusClick} />
                    <PlusSVG  className={classNames(
                        `${className}_plusIcon`,
                        {[`${className}_plusIcon_hideView`]:  currentView === 'HIDE'},
                        {[`${className}_plusIcon_largeView`]:  currentView === 'LARGE'},
                    )} onClick={handlePlusClick} />                    
                </div>
            </div>
            <iframe
                title='recipeVideo' 
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&version=3&playerapiid=ytplayer`}
                className={classNames(
                    `${className}_iframe`,
                    {[`${className}_hideView`]: currentView === 'HIDE'}
                )}
            />
        </div>
    )
}

export default VideoSection