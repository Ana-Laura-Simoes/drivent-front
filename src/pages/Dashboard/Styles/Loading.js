import styled from "styled-components";
import Loader from "react-loader-spinner";

export default function Loading( { loadingMessage } ) {
    return( 
        <Grid>     
        <Loader
          type="Oval"
          color="#E0E0E0"
          height={100}
          width={100}
        />
        <span>{loadingMessage}</span>
        </Grid>
        );
}

const Grid = styled.div`
width:100%;
height:100%;
display: flex;
flex-direction: column ;
align-items: center;
justify-content: center;

span{
font-size: 17px;
line-height: 20px;
text-align: center;
color: #7B7B7B;
}
`;
