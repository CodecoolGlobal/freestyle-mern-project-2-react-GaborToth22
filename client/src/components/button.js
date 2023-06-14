const Button = ({onClick, content, type}) => {
    return(
        <div>
            <button onClick={onClick} type={type}>{content}</button>
        </div>
    )
}


export default Button;