import Header from './Header';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useState  , useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';

const axios = require("axios");
var news_len;
const getFormattedPrice = (price) => `$${price.toFixed(2)}`;
    const arr=[];

const useStyles = makeStyles({
    h3: {
      paddingTop:"15px",
        textAlign: "center"
      },

      newspaperlist: {
        width: "30%",
        margin: "0 auto",
        listStyle: "none",
        padding: "0"
      },

     temp:{
        marginBottom: "0.5rem"
      },

      newspaperlistitem : {
        display: "flex",
        justifyContent: "space-between"
      },

      lastchild:{
        borderTop: "1px solid #ccc",
        marginTop: "1rem",
        paddingTop: "1rem"
        
      },

      label:{
        verticalAlign: "text-bottom",
        marginLeft: "0.2rem"
      },

      rightsection:{
        marginBottom:"100px"
      },
      radiobuttons:{
        width: "16%",
        margin: "0 auto",
        listStyle: "none",
        padding: "0",
        marginBottom:"127px"
      }
     
   

  });

  const StyledButton = styled(Button)({
    '&:hover': {
        backgroundColor: '#A7423A',
        boxShadow: '20',
        width: '44ch'
      }
  })


const ProfileNext = () =>{

    

    const classes = useStyles();
    const navigate = useNavigate();
    const [allnewspaper,setAllnewspaper] = useState([])
    const [len,setLen] = useState(0)
   
  

    const id = localStorage.getItem('id');
    // console.log("id "+id)
    
    
    const [checkedState, setCheckedState] = useState([]);

    const getData = async () => {
     const response = await axios.get(`http://localhost:4000/customer/profilenext/${id}`)
     console.log(response.data);
   
     {
      const arr = response.data;
      setAllnewspaper(arr)
      console.log(arr);
      let temp = []
      for(let i=0;i<arr.length;i++)
      {
        temp.push(false)
      }
      setCheckedState(temp)
     }
       
      
          
    }
    useEffect(() => {
        getData();
    }, []);
     
      console.log(checkedState);
      const [total, setTotal] = useState(0);
      const [scrap_p,setScrap_p] = useState(0)

      const handleOnChange = (position) => {
          const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
          );
          
          console.log("inside");
          setCheckedState(updatedCheckedState);
        
          const totalPrice = updatedCheckedState.reduce(
              (sum, currentState, index) => {
                  
                if (currentState === true) {
                  console.log(`inside${sum}`);
                  return sum + allnewspaper[index].cum_price;
                  
                }
                console.log(`outside${sum}`);
                return sum;
              
              },
              0
            );
              console.log("totalPrice");
            setTotal(totalPrice);

          const ScrapPrice = updatedCheckedState.reduce(
            (sum, currentState, index) => {
                
              if (currentState === true) {
                console.log(`inside${sum}`);
                return sum + allnewspaper[index].scrap_price;
                
              }
              console.log(`outside${sum}`);
              return sum;
            
            },
            0
          );
          console.log("totalPrice");
        setScrap_p(ScrapPrice);
      }

        const [scrap,setScrap] = useState(false)
       
        const onChangeValue=(event)=>{
          console.log(event.target.value);
          if(event.target.value==="yes")
          setScrap(1)
          else
          setScrap(0)
         
        }

       
        console.log(`Final ${scrap} ${checkedState}`);

        const submit = async(e)=>{
          let temp2 = [];
          e.preventDefault();
          for(let i=0;i<allnewspaper.length;i++)
          {
            if(checkedState[i]===true)
            temp2.push(allnewspaper[i])
          }
          
          const result = await axios.post(`http://localhost:4000/customer/profilenext/${id}`,{
              newspaper:temp2,
              id:id,
              scrap:scrap,
              bill:total - scrap_p*scrap,
              billstatus:0,
              subscription:1,
              date:new Date().toJSON().slice(0,10).replace(/-/g,'-')

          })
          console.log(result.data)
          if(result.data==="success"){
              Swal.fire({
                  icon: 'success',
                  title:'done',
                  text: 'Successfully Posted',
                  showConfirmButton: false,
                  timer: 1500
            })
              navigate(`/customer/bill`);
          }
          else{
              Swal.fire({
                  icon: 'error',
                  title:'done',
                  text: 'Something went wrong',
                  showConfirmButton: false,
                  timer:   1500
            })
            navigate(`/customer/profile/pronext`);
          }
      }
  
  

    return(
        <div className='App'>
            <Header />
            <h1 className={classes.h3}>Select Newspaper</h1>
          
      <ul className={classes.newspaperlist}>
        {allnewspaper.map(({ name,cum_price}, index) => {
          return (
            <li key={index} className={classes.temp}>
              <div className={classes.newspaperlistitem}>
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`} className={classes.label}>{name}</label>
                </div>
                
                <div className="right-section">{getFormattedPrice(cum_price)}</div>
              </div>
            </li>
          );
        })}
        <div className={classes.lastchild}></div>
        <li>
          <div className={classes.newspaperlistitem}>
            <div className={classes.leftsection}>Total:</div>
            <div className={classes.rightsection}>       
            {getFormattedPrice(total)}</div>
            
            <div className={classes.leftsection}>Scrap:</div>
            <div className={classes.rightsection}>       
              {getFormattedPrice(scrap_p*scrap)}
            </div>

            
            <div className={classes.leftsection}>Amount to be paid:</div>
            <div className={classes.rightsection}>       
              {getFormattedPrice(total - scrap_p*scrap)}</div>
            </div>
        </li>
      </ul>
      <div className={classes.radiobuttons} onChange={onChangeValue}>
        <strong>Scrapping Service:</strong>
      
      <label >
        <input type="radio" value="yes" name="scrap" checked={null}  />
        Yes
      </label>
      <label >
        <input type="radio" value="no" name="scrap" checked={null}  />
       No
      </label>
     </div>
     <br/>
     <StyledButton
          type="submit"
          margin="normal"
          sx={{ width: '44ch',marginLeft:"39%",marginTop:"2px",marginBottom:"30px",backgroundColor: '#e85a4f'}}
          variant="contained"
          onClick={submit}
      >
          Subscribe
      </StyledButton>

     </div>
    
    )

}

export default ProfileNext;