
class DatosArray {

    constructor(){
        this.elementos = [];
    }

    proximoID = (arr) =>{
        if(arr.length > 0){
            let ids = arr.map(el => el.id);
            const max = Math.max.apply(null, ids);
            return max+1;
        }else{
            return 1;
        }
    }

    guardar = (obj) =>{
        try {
            let datos = this.listarTodo();
            let proximoId = this.proximoID(datos);
            obj = {...obj,id:proximoId};
            this.elementos.push(obj);
            return proximoId;
        } catch (error) {
            console.log('Guardar - ocurrio un error: ' + error);
        }
    }

    listarPorId = (id) =>{
        try {
            let producto = this.elementos.find(el => el.id === id);
            if(producto === undefined){
                return null;
            }else{
                return producto;
            }
        } catch (error) {
            return 'ListarPorId - No se pudo consultar:'+error;
        }
    }


    listarTodo = () =>{
        try {
            return [...this.elementos];
        } catch (error) {
            return [];
        }
    }

    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }

}


module.exports = DatosArray;