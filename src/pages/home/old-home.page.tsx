import { useEffect, useState } from "react";
import { PageTitle } from "../../components/page-title.component";
import "./home.page.css"

const HomePage = ()=>{

    const [userDetail,setUserDetail]=useState({
        name:"Bikash",
        email:"bikashpandey@gmail.com",

    });

    useEffect(()=>{
        console.log("useEffect is called");
        
    });

    const [loading,setLoading]=useState(false);

    useEffect(()=>{

        console.log("I am loaded only once at first render")
        setLoading(true);
        setUserDetail({
            name:"Updated",
            email:"updated@gmail.com"
        })

    },[])
    useEffect(()=>{

        console.log("only executed when the loading is updated/changed")

    },[loading])
    

    return(
        <div className="bg-red-100">
            <PageTitle title="Hello world"/>
            <PageTitle title="Second Title"/>
            <h1>{userDetail.name}</h1>
            <h1>{userDetail.email}</h1>





            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum necessitatibus modi consequuntur id voluptatibus iusto quas quisquam magni iure? Iusto, eligendi. Sint magnam quisquam ea accusantium dignissimos distinctio commodi ullam.</p>
            <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>

        </div>
    )
}
export default HomePage;