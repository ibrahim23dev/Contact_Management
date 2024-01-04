import { toast } from 'react-toastify';

class ValidationHelper{

    isEmpty(value){
        if(value.length===0){
            return true;
        }
        else {
            return false
        }
    }

    SuccessToast(msg){
        toast.success(msg, {position:"bottom-center"})
    }
    ErrorToast(msg){
        toast.error(msg, {position:"bottom-center"})
    }


}

export const {isEmpty,SuccessToast,ErrorToast}=new ValidationHelper();