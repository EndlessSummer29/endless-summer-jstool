import { emitter } from "../../main";
export default function onemit(three){
    emitter.on('exportGLTF',data=>{
        console.log('asfasfsafasfasfsafasf',data)
    })
    emitter.on('importGLTF',data=>{
        let inputdom = document.createElement("input")
        inputdom.type = 'file'
        inputdom.style.display = 'none'
        document.body.appendChild(inputdom)
        inputdom.click()
        console.log('importGLTFDASDASDASD',inputdom.files[0])
    })
}