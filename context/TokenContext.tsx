import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import { tokenConstants } from '../utils/tokenConstants';

export interface Token {
    token: string;
    tokenID: string;
    setToken: Function;
    tokenIcon: string;
}

export const initialState = {
    token: 'Token',
    tokenID: '',
    setToken: Function(),
    tokenIcon: '',
  };

const Token = createContext<Token>(initialState);

const TokenContext = ({ children }) => {
    const [token, setToken] = useState('Token');
    const [tokenIcon, setTokenIcon] = useState('');
    const [tokenID, setTokenID] = useState('');


    useEffect(() => {
        console.log('WOOO');
        tokenConstants.forEach((coin) => {
            console.log('COIN', coin);
            console.log(token);
            if (token === coin.symbol.toUpperCase()) {
                setTokenID(coin.id);
                setTokenIcon(coin.icon);
            }
        })
    }, [token])

    return (
        <Token.Provider value={{ token, tokenID, setToken, tokenIcon }}>
            {children}
        </Token.Provider>
    )

}

export default TokenContext;

export const TokenState = () => {
    const context = useContext(Token);
    if (context === undefined) {
        throw new Error("TokenState must be used with TokenContext");
      }
    return context;
}

