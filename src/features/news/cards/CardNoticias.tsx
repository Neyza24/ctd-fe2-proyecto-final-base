import { INoticiasNormalizadas } from "../types";
import { TarjetaNoticia, FechaTarjetaNoticia, DescripcionTarjetaNoticia, ImagenTarjetaNoticia, TituloTarjetaNoticia, BotonLectura, } from "../styled";


const CardNoticias = ({ noticias, setModal }: { noticias: INoticiasNormalizadas[], setModal: (n: INoticiasNormalizadas) => void }) => {

    return (
        <>
            {noticias.map((n) => (
                <TarjetaNoticia>
                    <ImagenTarjetaNoticia src={n.imagen} />
                    <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
                    <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
                    <DescripcionTarjetaNoticia>
                        {n.descripcionCorta}
                    </DescripcionTarjetaNoticia>
                    <BotonLectura onClick={() => setModal(n)}>Ver más</BotonLectura>
                </TarjetaNoticia>
            ))
            }
        </>
    )
}

export default CardNoticias;