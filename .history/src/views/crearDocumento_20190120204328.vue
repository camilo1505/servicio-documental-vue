<template>
<center>
    <div class="container" >
        <div class="col-lg-4">
            <div class="jumbotron">
                <h3>Crear Documento</h3>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Nombre Documento" v-model="documentoDTO.nombre">
                </div>
                <div class="form-group">
                    <textarea class="form-control" rows="5" placeholder="Descripcion" v-model="documentoDTO.descripcion"></textarea>
                </div>
                
                <div>
                    <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>
                </div>
                <div class="form-group">
                    <table>
                        <tr>
                            <td><i class="fa fa-lock" aria-hidden="true"></i>Borrador  <input type="radio" id="borrador" value="borrador" name="estado" v-model="documentoDTO.estado"></td>
                        </tr>
                        <tr>
                            <td><i class="fa fa-unlock" aria-hidden="true"></i>Publicado  <input type="radio" id="publicado" value="publicado" name="estado" v-model="documentoDTO.estado"></td>
                        </tr>
                    </table>
                </div>
                <div>
                    
                </div>

                <div class="row">
                        <div class="col-sm-5">
                            <button class="btn btn-primary form-control" @click="crearDocumento(documentoDTO)">Guardar</button>
                        </div>
                        <div class="col-sm-5">
                            <button class="btn btn-warning form-control" @click="redireccionar()">Cancelar</button>
                        </div>
                    </div>
            </div>
        </div>
        <div class="col-lg-4"></div>
    </div>
</center>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
        documentoDTO: {
                nombre: null,
                etiquetas: [],
                descripcion: null,
                estado: null,
                archivos: null,
                autor: null
            },
            etiqueta: null,
            respuesta: null,
      tag: '',
      tags: [],
    };
  },
};
</script>