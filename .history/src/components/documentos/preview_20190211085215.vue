<template>
    <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
</template>
 
<script>
export default {
    data () {
      return {
        direccion:'/misterySnow/japones/img003 (2).jpg',
        slide1: [
          {
            src: 'http://localhost:8080/resources/misterySnow/japones/08_Compiladores_',
            msrc: 'http://localhost:8080/resources/misterySnow/japones/08_Compiladores_',
            alt: 'visualizar',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          },
          {
            src: '@/assets/logo.png',
            msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
            alt: 'picture2',
            title: 'Image Caption 2',
            w: 1200,
            h: 900
          }
        ],
        images: {
                sample: require('@/assets/logo.png')
            },
        title: "Image Upload",
        dialog: false,
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    methods: {
      inicializador(){
          for (const imagen of this.archivos) {
              slide.add({
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