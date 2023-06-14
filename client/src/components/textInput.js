const TextInput = ({labelContent, placeholderContent, rel, type, onChange}) => {

    return(
        <div>
            <label> 
                <input placeholder={placeholderContent} ref={rel} type={type} onChange={onChange}>  
                </input>
            </label>
        </div>
    )
}


export default TextInput;