
type AvatarCellProps = {
  src?: string;
  alt?: string;
  primary: string;
  secondary?: string;
};

const AvatarCell = ({ src, alt, primary, secondary }: AvatarCellProps) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full border-2 border-primary/10 overflow-hidden shrink-0 bg-surface-container-low">
      {src ? (
        <img
          src={src}
          alt={alt ?? primary}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-on-surface-variant">
          {primary.charAt(0)}
        </div>
      )}
    </div>
    <div>
      <div className="font-headline font-bold text-on-surface">{primary}</div>
      {secondary && (
        <div className="text-[11px] text-on-surface-variant">{secondary}</div>
      )}
    </div>
  </div>
);

export default AvatarCell;
