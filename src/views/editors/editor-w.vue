<template>
    <div class="tinymceinit" style="height:100%;">
        <div style="width:50%;height:100%;box-sizing: border-box;padding-bottom: 20px;">
            <Editor v-model="myValue" :init="editorInit"></Editor>
        </div>
        <div style="width:50%;height:100%;box-sizing: border-box;padding: 20px;background-color: rgba(183, 183, 183, 0.17);;">
            <div class="htmlinit" style="height:100%;">
                <div v-html="myValue">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/paste'
export default {
props: {
    value: {
    type: String,
    default () {
        return ''
    }
    }
},
data () {
    return {
    editorInit: {
        language_url: '/tinymce/zh-Hans.js',
        skin_url: '/tinymce/skins/lightgray',
        height: 600,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu paste',
        toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        paste_data_images: true,
        paste_webkit_styles: 'all',
        // autoresize_overflow_padding: 10
        // statusbar:false
    },
    myValue: this.value
    }
},
    // watch:{
    //     htmlheight(){
    //         var o = document.getElementsByClassName("mce-top-part")[0];
    //         var h = o.offsetHeight; //高度
    //         var w = o.offsetWidth;
    //         console.log('hhhhhhhhh',h)
    //     }
    // },
mounted () {
    tinymce.init({})
    // setInterval(() => {
    //     console.log(this.htmlheight)
    // }, 3000);
},
methods: {
    imgUpload (blob, success, failure) {
    let formData = new FormData()
    formData.set('images', blob.blob(), blob.filename())
    // this.$api.upload(formData, res => {
    //   success(this.$baseApiUrl + res['files'][0])
    // }, () => {
    //   failure('error')
    // })
    }
},
components: {
    Editor
},
watch: {
    value (n) {
    this.myValue = n
    },
    myValue (v) {
    // this.$emit('input', v)
    }
}
}
</script>

<style type="text/scss" lang="scss">
.mce-branding{
    display: none !important;
}
.mce-panel{
    border: 0 !important;
    box-shadow: rgba(0, 0, 0,  0.05) 0px 2px 12px 0px;
}
.mce-menubar{
    border: 1px solid #f0f1f4;
}
.mce-menubar .mce-menubtn{
    -webkit-transition: all 0.2s linear 0s;
    transition: all 0.2s linear 0s;
}
.mce-menubar .mce-menubtn:hover{
    border-color: transparent !important;
    background: #e9e9eb !important;
    
}
.mce-menubar .mce-menubtn:hover button span{
    color: rgba(0,0,0,0.8) !important;
}
.mce-menubar .mce-menubtn:focus{
    border-color: transparent !important;
    color: rgba(0,0,0,0.8) !important;
    background: #e9e9eb !important;
}
.mce-menu.mce-animate{
    box-shadow: rgba(0, 0, 0,0.1) 6px 11px 28px 0px;
}
.tinymceinit{
    display: flex;
    justify-content: space-between;
    .htmlinit{
        p{
            margin: 14px 0;
        }
        overflow-y: scroll;
        height: 100%;
        box-sizing: border-box;
        padding: 8px;
        background: #fff;
        color: #000000;
        font-family: Verdana,Arial,Helvetica,sans-serif;
        font-size: 14px;
        line-height: 1.3;
    }
}



.htmlinit::-webkit-scrollbar {
  width: 6px;
  height: 8px
}

.htmlinit::-webkit-scrollbar-track-piece {
  background: none;
}

.htmlinit::-webkit-scrollbar-thumb {
  /* background-color: rgba(182, 182, 182, 0.5);
  border-radius: 8px; */
  background-color: #b7b7b7;
  border-radius: 4px;
}

.htmlinit::-webkit-scrollbar-thumb:vertical {
  border-radius: 4px;
}

.htmlinit::-webkit-scrollbar-thumb:hover {
  background-color: rgba(177, 177, 177, 0.8)
}
.mce-panel{
    // box-shadow: rgba(0, 0, 0, 0) 0px 2px 12px 0px !important;
    
}
</style>
