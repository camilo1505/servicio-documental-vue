<template>
    <div>
    <vue-preview :slides="slide" @close="handleClose"></vue-preview>
    
      <p></p>
    </div>
    
</template>
 
<script>
export default {
  props:{
    archivos:null
  },
    data () {
      return {
        slide: [],
        title: "Image Upload",
        dialog: false,
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    methods: {
      inicializador(){
          for (var image of this.archivos) {
              this.slide.add(
                {
                  src: 'http://localhost:8080'+image.URL,
                  msrc: 'http://localhost:8080'+image.URL,
                  alt: image.nombreArchivo,
                  title: image.nombreArchivo,
                  w: 600,
                  h: 400
                }
              )
          }
      },
      pickFile () {
            this.$refs.fileField
        },
		
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
      handleClose () {
        console.log('close event')
      }
    }
  }
</script> 