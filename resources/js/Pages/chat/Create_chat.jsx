import Button_DP from "@/Components/App_Chat/Create_Chate_Group/Button_Details_People";
import Button_start_Chat from "@/Components/App_Chat/Create_Chate_Group/Button_start_Chat";
import Contact_Add_in_Group from "@/Components/App_Chat/Create_Chate_Group/Contact_Add_in_Group";
import Detais_Group from "@/Components/App_Chat/Create_Chate_Group/Details_Group";
import { Context_Data } from "@/CreatContexts";
import { router, useForm } from "@inertiajs/react";
import { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";


function Creat_Chate() {
    const {Liste_data_des_Contact, AuthUserId}=useContext(Context_Data)
    	
    		console.log(Liste_data_des_Contact);
    
    
    const {post,data,setData , processing}=useForm({
        Status_Chat	:'group',   
        titre:'',
        image	:'',
        Description : '',	
        contacts : []
        // chat_id	:message_in_rooms.id,
    })

    // -----------get Contact checked
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
      console.log(e.target);
        // Case 1 : The contact checks the box
        if (checked && !data.contacts.find(id => id == parseInt(value))) {
            
          setData('contacts',[...data.contacts, parseInt(value)])
        }
      
        // Case 2 : The contact unchecks the box
        else {
          setData('contacts',data.contacts.filter((id) => id !== parseInt(value)))
        }
      
      };
// --------------------------------------------------

const inputFile = useRef(null)


const [UrlFile,setUrlFile] = useState(null)
// --------------------------------------------------
      const HandelAddFile=(event)=>{
          
          setData('image',event.target.files[0])
          const url = URL.createObjectURL(event.target.files[0])
          setUrlFile(url)
          console.log('Url',url);

      }
      const handleSubmit=(e)=>{
        // console.log(data);
        
        e.preventDefault();

        post(route('chat.create_Group'),{
            onSuccess: (response) => {
                // alert('success')
                console.log(response.props.flash.Create_Group);

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 6000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  Toast.fire({
                    icon: response.props.flash.Create_Group.icon,
                    title: response.props.flash.Create_Group.message
                  })
                  location.reload();
                  

            }
        })
      }
    return ( 
    
    <>
{/* <Authenticated> */}
    <aside className="sidebar brd-Right ms-2 me-5">
    <div className="tab-content h-100" role="tablist">
     <div className="tab-pane fade h-100 show active" id="tab-content-create-chat" role="tabpanel">
                        <form className="d-flex flex-column h-100"  onSubmit={handleSubmit}>
                            <div className="hide-scrollbar">

                                <div className="container py-8">

                                    {/* <!-- Title --> */}
                                    <div className="mb-8">
                                        <h2 className="fw-bold m-0">Create chat</h2>
                                    </div>

                                    {/* <!-- BUtton_DETAILS_AND_PEOPLE --> */}
                                    <div className="mb-6">
                                        
                                       {/* -------------------------<Button Details peaple>--------------------------- */}
                                        <Button_DP/>
                                    </div>

                                    <div className="tab-content" role="tablist">
                                        
                                       {/* Componnet <Detait_Group> */}
                                            <Detais_Group
                                            HandelAddFile={HandelAddFile}
                                            inputFile={inputFile}
                                            UrlFile={UrlFile}
                                            setData={setData}
                                            />
                                            
                                                    <Contact_Add_in_Group 
                                                    data_contact={Liste_data_des_Contact}
                                                    handleChange={handleChange}
                                                    />
                                        
                                    </div>
                                </div>

                            </div>

                            {/* <!-- Button --> */}
                           {/* ---------------------ADD BUTTON Start CHAT------------------------------- */}
                           {/* <Button_start_Chat
                           /> */}
                           
     <div className="container mt-n4 mb-8 position-relative">
                                <button className="btn btn-lg btn-primary w-100 d-flex align-items-center" type="submit" >
                                    Start chat
                                    <span className="icon ms-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </span>
                                </button>
                            </div>
                            {/* <!-- Button --> */}
                        </form>
                    </div></div></aside>
{/* </Authenticated> */}
    </> 
    );
}

export default Creat_Chate;