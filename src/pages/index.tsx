import { GetStaticProps } from "next";
import Image from "next/legacy/image";
import { HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe";
import Stripe from "stripe";

interface HomeProductProps {
  products: {
    id: string;
    imageUrl: string;
    name: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProductProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {
        products.map(product => {
          return (
            <Product
              href={`/product/${product.id}`}
              key={product.id}
              className="keen-slider__slide"
            >
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                placeholder="blur"
                blurDataURL={product.imageUrl}
              />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          )
        })
      }
    </HomeContainer>
  )
}

// File-system Routing
// Roteamento baseado em arquivos físicos

/*getServerSideProps faz com que a página apenas carregue todo seu conteúdo quando ter o retorno das propriedades,
usar apenas para informações que necessitam estar na página para os crowlers e bots*/

/*getStaticProps faz com que a página apenas carregue todo seu conteúdo uma vez,
até dar o tempo do revalidate e um usuário acessa-lo para refazer a pagina para os próximos acessos
utilizar apenas para páginas que são exibidas igualmente a todos os usuários*/
export const getStaticProps: GetStaticProps = async () => {

  // await new Promise(resolve => setTimeout(resolve, 2000))

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {

    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 //2 horas
  }
}