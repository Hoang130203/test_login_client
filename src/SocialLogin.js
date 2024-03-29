import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
function FacebookLogin() {
    const access_token='ya29.a0Ad52N39uAoC99pIK9qYfsnDNFc-L9xft8ApH_VplktqaHIAkjk4wnpOr72hUfuJlqLMjfPD3fanDfjeAB-Mzj8_csMK5dqlleRrZpS3uRUMnAIXK9_YuedO3C-_Fntsdqi6MReUT0oYjkLDpvtlpybyrMlUHMW9ngoEaCgYKAbcSARMSFQHGX2Mi5iqqnYaebwofYcyAkkTUtQ0170'
    // useEffect   (()=>{  
    //     axios.get('https://cors.bridged.cc/https://www.googleapis.com/oauth2/v3/userinfo?alt=json', {
    //         headers: {
    //           'Authorization': 'Bearer ya29.a0Ad52N38-SLYQFp2YAdQnO_kMuZqi5Tosh-d9qltk2U1nfu2uRospSkVAUSV9dppTCAVahtMe4XiBLM6U5ASaFsdbJBGO_nyV0XVWX5eCu8KxXxaI0yc6dNpTiro3WlmHReDNplMEARR_S5TL9_eGmwFHYz4rDKJnaBcaCgYKARASARMSFQHGX2MitEH3QKYSDzMrL5tSN3l6DA0170',
    //           'Accept': '*/*',
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //           'Origin': 'http://localhost:3000',
    //           'Referer': 'http://localhost:3000/',
    //           'Sec-Fetch-Dest': 'empty',
    //           'Sec-Fetch-Mode': 'cors',
    //           'Sec-Fetch-Site': 'cross-site'
    //         }
    //       })
    //       .then(response => {
    //         console.log(response.data); // Dữ liệu phản hồi từ API
    //       })
    //       .catch(error => {
    //         console.error('Error fetching data:', error);
    //       });
    // },[])
    return ( 
        <div>
        <LoginSocialFacebook 
            appId="980183533498615"
            onResolve={(res)=>{
                 console.log(res.data);
                 alert(res.data.accessToken)
                 axios.post('http://localhost:8080/api/auth/processToken', 
                {
                    token: res.data.accessToken,
                    id:res?.data.id,
                    email:res?.data.email,
                    name:res?.data.name,
                    avatar:res?.data.picture?.data?.url,
                    hasProvider:true
                },
                {withCredentials:true,
                     headers: {
                    'Content-Type': 'application/json' // Đảm bảo định dạng dữ liệu gửi đi là JSON
                }})
            }}
            onReject={(err)=>{
                console.log(err);
            }}
        >
        <Button variant="contained">Login</Button>
        </LoginSocialFacebook>

        <LoginSocialGoogle
          client_id={"252305827166-jfe559gto0ntm0eei6t8ol2l5oaq1p7q.apps.googleusercontent.com" || ''}
          onResolve={(res)=>{
            console.log(res);
            alert(res.data.access_token)
       }}
       onReject={(err)=>{
           console.log(err);
       }}
        >
          <Button>Login google</Button>
        </LoginSocialGoogle>
        </div>
     );
}

export default FacebookLogin;