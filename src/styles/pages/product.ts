import { keyframes, styled } from '..';

export const ProductContainer = styled('main', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',

    maxWidth: 1180,
    margin: '0 auto',
    alignItems: 'stretch',
});

export const ImageContainer = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

    width: '100%',
    maxWidth: 576,
    height: 656,

    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    }
})

const skeleton = keyframes({
    '0%': { backgroundColor: '$gray800' },
    '100%': { backgroundColor: '$gray900' },
})

export const ImageContainerSkeleton = styled('div', {
    animation: `${skeleton} 1s linear infinite alternate`,

    width: 576,
    height: 656,
    borderRadius: 8,

})

export const TitleSkeleton = styled('div', {
    width: '100%',
    height: '2rem',
    animation: `${skeleton} 1s linear infinite alternate`,
    borderRadius: 8,
})

export const PriceSkeleton = styled('div', {
    width: '100%',
    height: '2rem',
    animation: `${skeleton} 1s linear infinite alternate`,
    borderRadius: 8,
    marginTop: '1rem',
    marginBottom: '2.5rem',
})

export const DescriptionSkeleton = styled('div', {
    width: '100%',
    height: '1.125rem',
    animation: `${skeleton} 1s linear infinite alternate`,
    borderRadius: 8,
    marginTop: '0.5rem'
})

export const ButtonSkeleton = styled('div', {
    width: '100%',
    animation: `${skeleton} 1s linear infinite alternate`,
    borderRadius: 8,
    marginTop: 'auto',
    padding: '1.25rem 0',
})

export const ProductInfo = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '1.5rem',

    h1: {
        fontSize: '$2xl',
        color: '$gray300'
    },

    span: {
        display: 'block',
        marginTop: '1rem',
        marginBottom: '2.5rem',
        fontSize: '$2xl',
        color: '$green300'
    },

    p: {
        color: '$gray300',
        fontSize: '$md',
        lineHeight: 1.6,
    },

    button: {
        marginTop: 'auto',
        width: '100%',
        padding: '1.25rem 0',
        backgroundColor: '$green500',
        border: 0,
        borderRadius: 8,
        cursor: 'pointer',
        color: '$white',
        fontWeight: 'bold',
        fontSize: '$md',
        transition: 'ease-in-out 0.5s',

        '&:hover': {
            backgroundColor: '$green300',
        }
    }
})
