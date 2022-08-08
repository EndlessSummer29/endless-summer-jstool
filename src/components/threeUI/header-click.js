import { emitter } from "../../main";
export default function clickbus(name){
    switch (name) {
        case 'exportGLTF':
            console.log(emitter)
            emitter.emit(name,true)
            break;
    
        default:
            break;
    }
}