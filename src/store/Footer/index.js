import './index.scss';

const Footer = () => {
    const main = () => {
            Year()
        },

        Year = () => {
            let Year = new Date().getFullYear();
            $('#year-copyright').text(Year);
        }

    main();

};

export default Footer;
