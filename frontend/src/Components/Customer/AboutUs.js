import "./AboutUs.css"
import Header from './Header';
export default function AboutUs(){
    
    return(
        <div>
            <Header/>
    <body className="about--us">
     <div className="aboutus--section">
          <div className="aboutus--container">
             <div className="aboutus--content-section">
                <div className="aboutus--title">
                            <h1>About us</h1>
                </div>
                    <div className="aboutus--content">
                        <h3>“The newspaper is a greater treasure to the people than uncounted millions of gold.”
                         <br/><b className="aboutus--author">Henry Ward Beecher</b></h3>
                        <p> Newspapers in India are like a commodity.Even in this digital era, 650 Million People read it every morning along with their cup of tea. But to avail or start them off requires knocking your neighbors door or wake up in UnGodly hours to communicate to your hawker! The system should be as smooth as you can now order your shoes, groceries or even plumber nowadays! And yes we know how messy your place gets when the papers you read stockpile. And then you need to synchronize your routine with the raddiwala's scream outside</p>
                        <div className="aboutus--button">
                            <a href="">Read More</a>
                        </div>
                    </div>
                    <div className="aboutus--social">
                        <a href=""><i className="fab fa-facebook-f"></i></a>
                        <a href=""><i className="fab fa-twitter"></i></a>
                        <a href=""><i className="fab fa-instagram"></i></a>
                       
                    </div>
                 </div>
                 <div className="aboutus--image-section">
                     <img src="/images/about-news.png" className="aboutus--image" />
                 </div>
                </div>
        </div>
    </body>
    </div>
    )
}