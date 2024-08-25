import Matrics from './matrics';

const size ={
    font8:Matrics.screenWidth * (7/375),
    font7:Matrics.screenWidth * (7/375),
    font10:Matrics.screenWidth * (10/375),
    font11:Matrics.screenWidth * (11/375),
    font12:Matrics.screenWidth * (12/375),
    font13:Matrics.screenWidth * (13/375),
    font14:Matrics.screenWidth * (14/375),
    font15:Matrics.screenWidth * (15/375),
    font16:Matrics.screenWidth * (16/375),
    font18:Matrics.screenWidth * (18/375),
    font20:Matrics.screenWidth * (20/375),
    font24:Matrics.screenWidth * (24/375),
    font30:Matrics.screenWidth * (30/375),
}



const weight = {
full:'900',
extraSemi:"700",
semi:'600',
medium:'500',
low:'400',
bold:'bold',
normal:'normal'

};


const type= {
montserratBold:"Montserrat-Bold",
montserratLight:"Montserrat-Light",
montserratMedium:"Montserrat-Medium",
montserratRegular:"Montserrat-Regular",
montserratSemiBold:"Montserrat-SemiBold",
RobotoRegular:"Roboto-Regular"
}

export default {size,weight,type};