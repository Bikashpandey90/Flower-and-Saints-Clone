interface Props{
    title:string;
    className?:string;
    children?:any;
}

export const PageTitle=({title,className}:Props)=>{
    return(
       <>
        <h1 style={{textAlign:"center"}} className={className}>
       {title}
       </h1>
       <h2></h2>
       </>

        );
}