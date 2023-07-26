import { useContext, useLayoutEffect, useRef, useState } from 'react'
import { NonAuthRenderContext } from '../../branches/NonAuth'
import gsap from 'gsap'
import './styles.css'
import classNames from 'classnames'

const Hero = () => {
    const {RENDERS, setRender} = useContext(NonAuthRenderContext)
    const [youtubeVisible, setYoutubeVisible] = useState(false)
    const [amazonVisible, setAmazonVisible] = useState(false)
    const [recipeVisible, setRecipeVisible] = useState(false)
    const [kitchenVisible, setKitchenVisible] = useState(false)
    const root = useRef(null)
    const timelineRef = useRef<gsap.core.Timeline>()

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            timelineRef.current = gsap.timeline({defaults: { ease: 'power1.out' }, repeat: -1 })
                //Youtube to Recipe Animation
                .to(`.${className}_youtubeVisual`, { 
                    onStart: () => {
                        setYoutubeVisible(true)
                    },
                    duration: 0.2, 
                    scale: 1.1, 
                }, "revealOne")
                .to(`.${className}_recipeVisual`, { 
                    onStart: () => {
                        setRecipeVisible(true)
                    },
                    duration: 0.2, 
                    scale: 1.1, 
                }, "revealOne")
                .to(`.${className}_youtubeVisual > p`, { 
                    duration: 0.5, 
                    translateY: '-5px' 
                }, "revealOne")
                .to(`.${className}_recipeVisual > p`, { 
                    duration: 0.5, 
                    translateY: '-5px' 
                }, "revealOne")
                .to(`.${className}_youtubeSVG`, { 
                    duration: 0.5, 
                    translateY: '-5px' 
                }, "revealOne")
                .to(`.${className}_recipeSVG`, { 
                    duration: 0.5, 
                    translateY: '-5px' 
                }, "revealOne")
                .to(`.${className}_firstTop`, { 
                    duration: 0.5, 
                    width: '100%', 
                    opacity: 1 
                }, "revealOne")
                .to(`.${className}_firstRight`, { 
                    duration: 0.5, 
                    height: '100%', 
                    opacity: 1, 
                })

                //Hide First Line
                .set(`.${className}_firstTop`, {
                    left: 'auto',
                    right: 0
                })
                .set(`.${className}_firstRight`, {
                    top: 'auto',
                    bottom: 0
                })
                .to(`.${className}_firstTop`, { 
                    duration: 0.5, 
                    width: 0, 
                })
                .to(`.${className}_firstRight`, { 
                    duration: 0.5, 
                    height: 0, 
                })
                .set(`.${className}_firstTop`, { clearProps: true })
                .set(`.${className}_firstRight`, { clearProps: true })

                //Hide Youtube, Reveal Second Line and Reveal Amazon
                .set(`.${className}_secondTop`, { clearProps: true })
                .to(`.${className}_youtubeVisual`, {
                    duration: 0.2, 
                    scale: 1, 
                }, "revealTwo")
                .to(`.${className}_youtubeVisual > p`, { 
                    duration: 0.2, 
                    translateY: 0 
                }, "revealTwo")
                .to(`.${className}_youtubeSVG`, { 
                    duration: 0.2, 
                    translateY: 0,
                    onComplete: () => setYoutubeVisible(false)
                }, "revealTwo")
                .to(`.${className}_amazonVisual`, {
                    onStart: () => setAmazonVisible(true),
                    duration: 0.2, 
                    scale: 1.1, 
                }, "revealTwo")
                .to(`.${className}_amazonVisual > p`, { 
                    duration: 0.5, 
                    translateY: '-5px' 
                }, "revealTwo")
                .to(`.${className}_amazonSVG`, { 
                    duration: 0.5, 
                    translateY: '-5px',
                }, "revealTwo")
                .to(`.${className}_secondTop`, { 
                    duration: 0.5, 
                    width: '100%', 
                    opacity: 1 
                }, "revealTwo")
                .to(`.${className}_secondLeft`, { 
                    duration: 0.5, 
                    height: '100%', 
                    opacity: 1, 
                })

                //Hide Second Line
                .set(`.${className}_secondTop`, {
                    right: 'auto',
                    left: 0
                })
                .set(`.${className}_secondLeft`, {
                    top: 'auto',
                    bottom: 0
                })
                .to(`.${className}_secondTop`, { 
                    duration: 0.5, 
                    width: 0
                })
                .to(`.${className}_secondLeft`, { 
                    duration: 0.5, 
                    height: 0
                })
                .set(`.${className}_secondTop`, { clearProps: true })
                .set(`.${className}_secondLeft`, { clearProps: true })

                //Hide Recipe, Reveal Third Line and Reveal Kitchen
                .to(`.${className}_recipeVisual`, {
                    duration: 0.2, 
                    scale: 1, 
                }, "revealThree")
                .to(`.${className}_recipeVisual > p`, { 
                    duration: 0.2, 
                    translateY: 0 
                }, "revealThree")
                .to(`.${className}_recipeSVG`, { 
                    duration: 0.2, 
                    translateY: 0,
                    onComplete: () => setRecipeVisible(false)
                }, "revealThree")
                .to(`.${className}_kitchenVisual`, {
                    onStart: () => setKitchenVisible(true),
                    duration: 0.2, 
                    scale: 1.1, 
                }, "revealThree")
                .to(`.${className}_kitchenVisual > p`, { 
                    duration: 0.5, 
                    translateY: '-5px' 
                }, "revealThree")
                .to(`.${className}_kitchenSVG`, { 
                    duration: 0.5, 
                    translateY: '-5px',
                }, "revealThree")
                .to(`.${className}_thirdTop`, { 
                    duration: 0.5, 
                    width: '100%', 
                    opacity: 1 
                }, "revealThree")
                .to(`.${className}_thirdRight`, { 
                    duration: 0.5, 
                    height: '100%', 
                    opacity: 1, 
                })

                //Hide Third Line
                .set(`.${className}_thirdTop`, {
                    left: 'auto',
                    right: 0
                })
                .set(`.${className}_thirdRight`, {
                    top: 'auto',
                    bottom: 0
                })
                .to(`.${className}_thirdTop`, { 
                    duration: 0.5, 
                    width: 0
                })
                .to(`.${className}_thirdRight`, { 
                    duration: 0.5, 
                    height: 0
                })
                .set(`.${className}_thirdTop`, { clearProps: true })
                .set(`.${className}_thirdRight`, { clearProps: true })

                //Hide Amazon and Kitchen Visuals
                .to(`.${className}_amazonVisual`, {
                    duration: 0.2, 
                    scale: 1, 
                }, "hideFinal")
                .to(`.${className}_amazonVisual > p`, { 
                    duration: 0.2, 
                    translateY: 0 
                }, "hideFinal")
                .to(`.${className}_amazonSVG`, { 
                    duration: 0.2, 
                    translateY: 0,
                    onComplete: () => setAmazonVisible(false)
                }, "hideFinal")
                .to(`.${className}_kitchenVisual`, {
                duration: 0.2, 
                scale: 1, 
            }, "hideFinal")
            .to(`.${className}_kitchenVisual > p`, { 
                duration: 0.2, 
                translateY: 0 
            }, "hideFinal")
            .to(`.${className}_kitchenSVG`, { 
                duration: 0.2, 
                translateY: 0,
                onComplete: () => setKitchenVisible(false)
            }, "hideFinal")
        }, root)
        return () => gsapContext.revert()
    }, [])

    const className = 'Hero'
    return (
        <div className={className} ref={root}>
            <div className={`${className}_textSection`}>
                <div className={`${className}_headerContainer`}>
                    <h2 className={`${className}_headerSmall`}>Single Page Recipes</h2>
                    <h1 className={`${className}_headerLarge`}>An integrated solution for learning recipes and ordering ingredients</h1>
                </div>
                <div className={`${className}_detailsContainer`}>
                    <p className={`${className}_text`}>Simplify the process of learning to cook by easily adding Youtube recipes to your online recipe book and integrating Amazon Fresh to automate recipe ingredient ordering</p>
                </div>
                <div className={`${className}_buttonContainer`}>
                    <button className={`${className}_button`} onClick={() => setRender(RENDERS[3])}>View Sample Recipe</button>
                </div>
            </div>
            <div className={`${className}_visualSection`}>
                <div className={`${className}_rowContainer`}>
                    <div className={classNames(
                        `${className}_visualContainer`, 
                        `${className}_youtubeVisual`, 
                        youtubeVisible && `${className}_svgVisible`)}
                    >
                        <svg className={`${className}_youtubeSVG`} viewBox='0 0 100 100'>
                            <polygon points='30,25 30,75 80,50'></polygon>
                        </svg>
                        <p className={`${className}_svgText`}>Youtube</p>
                    </div>
                    <div className={`${className}_borderAnimationContainer`}>
                        <div className={`${className}_borderAnimationRight`}>
                            <span className={`${className}_firstTop`}></span>
                            <span className={`${className}_firstRight`}></span>
                        </div>
                    </div>
                </div>
                <div className={`${className}_rowContainer`}>
                    <div className={`${className}_borderAnimationContainer`}>
                        <div className={`${className}_borderAnimationLeft`}>
                            <span className={`${className}_secondTop`}></span>
                            <span className={`${className}_secondLeft`}></span>
                        </div>                        
                    </div>
                    <div className={classNames(
                        `${className}_visualContainer`,
                        `${className}_recipeVisual`,
                        recipeVisible && `${className}_svgVisible`)}  
                    >
                        <svg className={`${className}_recipeSVG`} viewBox='0 0 100 100'>
                            <polygon points='47.5,30 20,25 20,75 47.5,80'></polygon>
                            <polygon points='47.5,30 52.5,30 52.5,80 47.5,80'></polygon>
                            <polygon points='52.5,30 80,25 80,75 52.5,80'></polygon>
                        </svg>
                        <p className={`${className}_svgText`}>Recipe Book</p>
                    </div>
                </div>
                <div className={`${className}_rowContainer`}>
                    <div className={classNames(
                        `${className}_visualContainer`,
                        `${className}_amazonVisual`,
                        amazonVisible && `${className}_svgVisible`)}
                    >
                        <svg className={`${className}_amazonSVG`} viewBox='0 0 1000 1000'>
                            <path d="M666,495.4c-45,33.2-110.3,50.9-166.4,50.9c-78.8,0-149.7-29.1-203.3-77.6c-4.2-3.8-0.4-9,4.6-6
                                c57.9,33.7,129.5,54,203.4,54c49.9,0,104.7-10.3,155.2-31.7C667.1,481.7,673.5,489.9,666,495.4"/>
                            <path d="M684.8,474c-5.7-7.4-38-3.5-52.5-1.8c-4.4,0.5-5.1-3.3-1.1-6.1c25.7-18.1,67.9-12.9,72.9-6.8
                                c4.9,6.1-1.3,48.4-25.5,68.6c-3.7,3.1-7.2,1.5-5.6-2.7C678.4,511.8,690.5,481.4,684.8,474"/>
                        </svg>
                        <p className={`${className}_svgText`}>Amazon Fresh</p>
                    </div>
                    <div className={`${className}_borderAnimationContainer`}>
                        <div className={`${className}_borderAnimationRight`}>
                            <span className={`${className}_thirdTop`}></span>
                            <span className={`${className}_thirdRight`}></span>
                        </div>
                    </div>
                </div>
                <div className={`${className}_rowContainer`}>
                    <div className={`${className}_borderAnimationContainer`}></div>
                    <div className={classNames(
                        `${className}_visualContainer`,
                        `${className}_kitchenVisual`,
                        kitchenVisible && `${className}_svgVisible`)}
                    >
                        <svg className={`${className}_kitchenSVG`} viewBox='0 0 100 100'>
                            <polygon points='20,40 50,20 80,40'></polygon>
                            <polygon points='25,80 75,80 75,40 25,40'></polygon>
                        </svg>
                        <p className={`${className}_svgText`}>Home Kitchen</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero