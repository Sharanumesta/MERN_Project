import Swal from 'sweetalert2'

const Logout = () =>  {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout!',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
        }
    });
}

export default Logout;