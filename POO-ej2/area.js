export default class Area{
    base_sup=''
    base_inf=''
    altu=''
    base=''
    altura=''

    constructor(bs, bi, a, b1, a1){
        this.base_sup=bs
        this.base_inf=bi
        this.altu=a
        this.base=b1
        this.altura=a1
    }

    calcular_area_trap () {
        const resultado= (parseInt(this.base_sup) + parseInt(this.base_inf)/2)*parseInt(this.altu);
        return resultado
    }

    calcular_area_triangulo (){
        const resultado1= parseInt(this.base)* parseInt(this.altura)/2
        return resultado1
    }
}

