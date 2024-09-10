import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [itemQuantity, setItemQuantity] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        const total = cart.reduce((accumulator, currentItem)=>{
            return accumulator + currentItem.price * currentItem.quantity
        }, 0)
        setTotal(total)
    })

    //update item quantity
    useEffect(()=>{
        if(cart){
            const quantity = cart.reduce((accumulator, currentItem)=>{
                return accumulator + currentItem.quantity;
            }, 0)
            setItemQuantity(quantity)
        }
    })

    const addToCart = (product, id) => {
        const newItem = { ...product, quantity: 1 };
        const cartItem = cart.find((item) => {
            return item.id === id;
        })
        if (cartItem) {
            const newCart = { ...cart }.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: cartItem.quantity + 1 };
                }
                else {
                    return item;
                }
            })
            setCart(newCart);
        } else {
            setCart([...cart, newItem]);
        }
    }
    ///remove from cart
    const removeFromCart = (id) => {
        const newCart = cart.filter((item) => {
            return item.id !== id;
        })
        setCart(newCart)
    }

    //clear cart
    const clearCart = () => {
        setCart([])
    }

    //increase quantity
    const increaseQuantity = (id) => {
        const newCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
        setCart(newCart)
    }

    //decrease
    const decreaseQuantity = (id) => {
        const cartItem = cart.find((item) => {
            return item.id == id
        })
        if (cartItem) {
            const newCart = cart.map((item) => {
                if (item.id == id) {
                    return { ...item, quantity: cartItem.quantity - 1 }
                } else {
                    return item
                }
            })
            setCart(newCart)
        }
        if (cartItem.quantity < 2) {
            removeFromCart(id)
        }
    }

    return (
        <CartContext.Provider value={{ addToCart, cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, itemQuantity, total }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
