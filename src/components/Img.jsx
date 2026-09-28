/** Image that quietly hides itself if the (placeholder) URL fails, leaving the frame's backdrop. */
export default function Img({ src, alt = "", className = "", ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.visibility = "hidden";
      }}
      {...rest}
    />
  );
}
