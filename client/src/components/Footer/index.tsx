import './styles.css'

const Footer = () => {
    const className = 'Footer'
    return (
        <div className={className}>
            <p className={`${className}_text`}>Developed by <a href="https://www.jdechavez.com/" className={`${className}_link`} target='_blank' rel='noreferrer'>James Dechavez</a></p>
        </div>
    )
}

export default Footer