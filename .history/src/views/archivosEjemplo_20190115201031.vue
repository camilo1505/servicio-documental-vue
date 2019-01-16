<template>
    <div role="form">
        <form enctype="multipart/form-data" id="my-form">
            <div class="form-group">
                <label class="btn btn-primary">
                    <i class="fa fa-folder-open-o" aria-hidden="true"></i>&nbsp;Seleccionar un archivo
                    <input type="file" accept=".pdf" @change="onFileSelected" name="myfile">
                </label>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "my-component",
        methods: {
            onFileSelected (event) {
               const file = event.target.files[0];
               const formData = new FormData($("#my-form")[0]);
               //const formData = new FormData();
               //formData.append("my-file", file);
               Vue.http.post(`url-to-serve`, formData)
                .then(res => {
                    //todo ok
                },
                error => {
                    //todo mal :P
                })
            }
        }
    }
</script>
