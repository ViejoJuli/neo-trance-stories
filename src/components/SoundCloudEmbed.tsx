interface SoundCloudEmbedProps {
  url: string;
  autoPlay?: boolean;
}

const SoundCloudEmbed = ({ url, autoPlay = false }: SoundCloudEmbedProps) => {
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23DFFF00&auto_play=${autoPlay}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

  return (
    <div className="rounded-xl overflow-hidden">
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedUrl}
        title="SoundCloud Player"
        className="w-full"
      />
    </div>
  );
};

export default SoundCloudEmbed;
