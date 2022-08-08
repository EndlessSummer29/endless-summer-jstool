import * as THREE from 'three'
import {GLTFExporter} from './GLTFExporter'
const layertest = new THREE.Layers()
// const gltfExporter = new GLTFExporter();

// const options = {
//     // trs: document.getElementById( 'option_trs' ).checked,
//     // onlyVisible: document.getElementById( 'option_visible' ).checked,
//     // truncateDrawRange: document.getElementById( 'option_drawrange' ).checked,
//     // binary: document.getElementById( 'option_binary' ).checked,
//     // maxTextureSize: Number( document.getElementById( 'option_maxsize' ).value ) || Infinity // To prevent NaN value
// };

function saveString( text, filename ) {

    save( new Blob( [ text ], { type: 'text/plain' } ), filename );

}

function save( blob, filename ) {
    const link = document.createElement( 'a' );
    link.style.display = 'none';
    document.body.appendChild( link ); // Firefox workaround, see #6594
    link.href = URL.createObjectURL( blob );
    link.download = filename;
    link.click();

    // URL.revokeObjectURL( url ); breaks Firefox...

}

function saveArrayBuffer( buffer, filename ) {

    save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

}
export default class ModelExporter {
    constructor(){
        this.gltfExporter = new THREE.GLTFExporter();
    }
    GLTF( model, options ){
        // try {
            
            console.log('GLTF',model)
            this.gltfExporter.parse( model, function ( result ) {
        
            if ( result instanceof ArrayBuffer ) {
        
                saveArrayBuffer( result, 'scene.glb' );
        
            } else {
        
                const output = JSON.stringify( result, null, 2 );
                console.log( output );
                saveString( output, 'scene.gltf' );
        
            }
        
        }, options );
        // } catch (error) {
        //     console.log('GLTFerror',error)
        // }
    }
}