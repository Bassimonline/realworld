import globeVideo from '../newVideo/Globe_360_animation_fast_v2_WebM 2.webm';
import styles from './HeroVideo.module.css';

export default function HeroVideo() {
  return (
    <div className={styles.heroVideo}>
      <video
        className={styles.video}
        src={globeVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/intro-poster.jpg"
        aria-hidden="true"
      />
    </div>
  );
}
