import React from 'react';
import Link from './styled/Link';

export const LoginFooter = () => (<div>
  <hr style={{border: 'none', borderBottom: '0.5px solid #555', marginTop: '20px'}}/>
  <Link to='/forgot'><span style={{color: '#aaa', marginRight: '8px'}}>Forgot your Password?</span></Link>
  <Link to='/terms'>Terms of Service</Link>
  <Link to='/privacy'>Privacy</Link>
  <div style={{color: '#555', marginTop: '20px', fontSize: '11px'}}>© 2017 Pixty Inc.</div>
</div>);