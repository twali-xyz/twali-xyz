import { float } from 'aws-sdk/clients/lightsail';
import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import { tokenConstants } from '../utils/tokenConstants';

export interface Token {
    tokenName: string;
    tokenID: string;
    setTokenName: Function;
    tokenIcon: string;
    tokenAmount: number;
    setTokenAmount: Function;
    calculatedUSD: number;
    setCalculatedUSD: Function;
}

export const initialState = {
    tokenName: 'Token',
    tokenID: '',
    setTokenName: Function(),
    tokenIcon: '',
    tokenAmount: 0,
    setTokenAmount: Function(),
    calculatedUSD: 0,
    setCalculatedUSD: Function(),
  };

const Token = createContext<Token>(initialState);

const TokenContext = ({ children }) => {
    const [tokenName, setTokenName] = useState('Token');
    const [tokenIcon, setTokenIcon] = useState('');
    const [tokenID, setTokenID] = useState('');
    const [tokenAmount, setTokenAmount] = useState(null);
    const [calculatedUSD, setCalculatedUSD] = useState(null);

    console.log('context token:', tokenName);


    useEffect(() => {
        console.log('WOOO');
        tokenConstants.forEach((coin) => {
            console.log('COIN', coin);
            console.log(tokenName);
            if (tokenName === coin.symbol.toUpperCase()) {
                setTokenID(coin.id);
                setTokenIcon(coin.icon);
            }
        })
    }, [tokenName])

    return (
        <Token.Provider value={{ 
            tokenName, 
            tokenID, 
            setTokenName, 
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

