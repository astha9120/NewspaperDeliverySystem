import "./HowItWorks.css"
import Header from './Header';



export default function HowItWorks(){
    return(
        <body className="hiw--body">
         <Header />

        <div className="hiw--background">
        {/* <h1 className="hiw--title">How it works</h1> */}
        <img src="/Images/hiw.png" className="hiw--image"/>
        </div>
        </body>
    )
}