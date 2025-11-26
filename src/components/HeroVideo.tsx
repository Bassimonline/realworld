import webpLogo from '/the-real-world-logo.webp';
import styles from './HeroVideo.module.css';

export default function HeroVideo() {
  return (
    <div className={styles.heroVideo}>
      <img
        className={styles.video} 
        src={webpLogo}
        alt="The Real World Logo"
        // 👇 We are adjusting the inline styles to ensure the image scales down
        style={{ 
          // 1. Ensure the image never exceeds the container width
          maxWidth: '300px', // Limits the image to 300px on large screens
          
          // 2. THIS IS CRUCIAL: Set the width to 100% of its container. 
          // It will automatically shrink on mobile while honoring the 300px max.
          width: '50%',     
          
          height: 'auto',    // Ensures the aspect ratio is maintained
          
          // 3. Keep margin for vertical spacing and centering
          margin: '20px auto', 
          display: 'block'
        }}
      />
    </div>
  );
}