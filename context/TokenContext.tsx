import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import { tokenConstants } from '../utils/tokenConstants';

export interface Token {
    token: string;
    symbol: string;
    setToken: Function;
    tokenIcon: string;
    setTokenIcon: Function;
}

export const initialState = {
    token: '',
    symbol: '',
    setToken: Function(),
    tokenIcon: '',
    setTokenIcon: Function(),
  };

const Token = createContext<Token>(initialState);

const TokenContext = ({ children }) => {
    const [token, setToken] = useState('Token');
    const [tokenIcon, setTokenIcon] = useState('');
    const [symbol, setSymbol] = useState('');
    
    useEffect(() => {
        tokenConstants.forEach((coin) => {
            if (token === coin.symbol.toUpperCase()) {
                setSymbol(coin.symbol.toUpperCase());
                setTokenIcon(coin.icon);
            }
        })
    })

    return (
        <Token.Provider value={{ token, symbol, setToken, tokenIcon, setTokenIcon }}>
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

