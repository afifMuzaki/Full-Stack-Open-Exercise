const Footer = (props) => {
    return (
        <>
            <p>Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>
        </>
    );
}

export default Footer;