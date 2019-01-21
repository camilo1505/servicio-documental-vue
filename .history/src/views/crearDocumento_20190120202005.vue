<template>
<center>
    <div class="container" >
        <div class="col-lg-4"></div>
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
                        <vue-tags-input
                        v-model="tag"
                        :tags="tags"
                        @tags-changed="newTags => tags = newTags"
                        />
  </div>
  <div class="form-group">
                    <div class="row">
                        <div class="col-sm-5">
                            <input type="text" class="form-control" placeholder="Etiqueta" v-model="etiqueta">
                        </div>
                        <div class="col-sm-2">
                            <button class="btn btn-success" @click="addEtiqueta(etiqueta)">Añadir</button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <input type="radio" id="borrador" value="borrador" name="estado" v-model="documentoDTO.estado">
                    <label for="borrador">Borrador</label>
                    <input type="radio" id="publicado" value="publicado" name="estado" v-model="documentoDTO.estado">
                    <label for="publicado">Publicado</label>
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
      tag: '',
      tags: [],
    };
  },
};
</script>