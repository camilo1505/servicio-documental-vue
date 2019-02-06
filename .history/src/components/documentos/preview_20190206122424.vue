<template>
    <v-app>
		<v-content>
			<v-container fluid>
				<v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageUrl" height="150" v-if="imageUrl"/>
					<v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>
				</v-flex>
				<v-dialog v-model="dialog" max-width="290">
					<v-card>
						
					</v-card>
				</v-dialog>
			</v-container>
		</v-content>
    <img src="./assets/08_Compiladores_.pdf">
  <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </v-app>
    

</template>
 
<script>
export default {
    data () {
      return {
        slide1: [
          {
            src: 'https://publicacion.com/wp-content/uploads/2018/09/15-imagenes-que-te-demostraran-que-no-te-puedes-fiar-ni-de-tu-pareja.jpg',
            msrc: 'https://publicacion.com/wp-content/uploads/2018/09/15-imagenes-que-te-demostraran-que-no-te-puedes-fiar-ni-de-tu-pareja.jpg',
            alt: 'visualizar',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          },
          {
            src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
            msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
            alt: 'picture2',
            title: 'Image Caption 2',
            w: 1200,
            h: 900
          }
        ],
        title: "Image Upload",
        dialog: false,
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    methods: {
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