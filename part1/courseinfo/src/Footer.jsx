const Footer = (props) => {
    return (
        <>
            <p>Number of exercises {props.exercise[0] + props.exercise[1] + props.exercise[2]}</p>
        </>
    );
}

export default Footer;