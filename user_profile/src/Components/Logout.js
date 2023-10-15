import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const Logout = () =>  {
    const navigate = useNavigate()
    Swal.fire({
        title: 'Logout',
        text: 'Are you sure you want to log out?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout!',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire('Logged Out','You have been logged out','success')
        .then(()=>{
            localStorage.removeItem('token');
            navigate('/login');
        });
        }if(result.isDismissed){
            navigate('/');
        }
    });
}

export default Logout;