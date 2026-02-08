import { Howl } from 'howler'

export const sounds = {
  catch: new Howl({ src: ['/assets/sounds/catch.mp3'], volume: 0.5 }),
  hit: new Howl({ src: ['/assets/sounds/hit.mp3'], volume: 0.4 }),
  triumph: new Howl({ src: ['/assets/sounds/win.mp3'], volume: 0.7 }),
  click: new Howl({ src: ['/assets/sounds/click.mp3'], volume: 0.3 }),
  animeeffect: new Howl({ src: ['/assets/sounds/animeeffect.mp3'], volume: 0.5 }),
  fart: new Howl({ src: ['/assets/sounds/fart-with-extra-reverb.mp3'], volume: 0.7 }),
  bgMusic: new Howl({ src: ['/assets/sounds/bg-music.mp3'], loop: true, volume: 0.25 }),
  kisses: new Howl({ src: ['/assets/sounds/freesound_community-kisses-90109.mp3'], volume: 0.8 }),
  emotionalDamage: new Howl({ src: ['/assets/emotional-damage.mp3'], volume: 0.7 }),
  violin: new Howl({ src: ['/assets/sounds/violin.mp3'], volume: 0.7 }),
  fewMoments: new Howl({ src: ['/assets/sounds/fewMoments.mp3'], volume: 0.8 }),
}

export const playSound = (name: keyof typeof sounds) => {
  const s = sounds[name]
  if (s && typeof window !== 'undefined') {
    try { s.play() } catch (e) { /* ignore play errors */ }
  }
}
