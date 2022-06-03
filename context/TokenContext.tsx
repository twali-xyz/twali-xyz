import { float } from 'aws-sdk/clients/lightsail';
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
    tokenAmount: number;
    setTokenAmount: Function;
    calculatedUSD: number;
    setCalculatedUSD: Function;
}

export const initialState = {
    token: 'Token',
    tokenID: '',
    setToken: Function(),
    tokenIcon: '',
    tokenAmount: 0,
    setTokenAmount: Function(),
    calculatedUSD: 0,
    setCalculatedUSD: Function(),
  };

const Token = createContext<Token>(initialState);

const TokenContext = ({ children }) => {
    const [token, setToken] = useState('Token');
    const [tokenIcon, setTokenIcon] = useState('');
    const [tokenID, setTokenID] = useState('');
    const [tokenAmount, setTokenAmount] = useState(0);
    const [calculatedUSD, setCalculatedUSD] = useState(0);

    console.log('context token:', token);


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
        <Token.Provider value={{ 
            token, 
            tokenID, 
            setToken, 
            tokenIcon, 
            tokenAmount, 
            setTokenAmount, 
            calculatedUSD, 
            setCalculatedUSD }}>
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

