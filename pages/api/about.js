import Link from 'next/link';

const About = () => (
    <div>
        <ul>
            <li><Link href='/'><a>Home</a></Link></li>
            <li><Link href='/about'><a>About</a></Link></li>
        </ul>
        <h1>About GouCoins</h1>
        <p>History and information on GouCoins</p>
        <p>Investment Value</p>
        <p>Application to view GouCoin prices</p>
        <h1></h1>
    </div>
)

export default About; 