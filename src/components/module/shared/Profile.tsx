type TUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

const Profile = ({ user }: { user: TUser }) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
    });

  return (
    <div
      className="min-h-screen bg-[#F1EFE8] flex items-center justify-center "
      style={{
        backgroundImage: "radial-gradient(circle, rgba(4,44,83,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="w-full max-w-[700px] bg-white rounded-3xl overflow-hidden border border-[#042C53]/10">

        {/* Top accent bar */}
        <div className="h-[4px] bg-gradient-to-r from-[#042C53] to-[#EF9F27]" />

        {/* Header — avatar + name inside dark section */}
        <div className="bg-[#042C53] px-8 py-8 flex items-center gap-5 relative overflow-hidden">
          {/* bg texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          {/* decorative ring */}
          <div className="absolute w-[200px] h-[200px] rounded-full border border-[#EF9F27]/10 -top-20 -right-14" />

          {/* Avatar */}
          <div className="relative z-10 flex-shrink-0">
            <div className="w-[80px] h-[80px] rounded-full bg-[#EF9F27] border-[3px] border-white/20 flex items-center justify-center text-[#042C53] text-3xl font-bold">
              {user.image
                ? <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                : initials
              }
            </div>
            {!user.isDeleted && (
              <span className="absolute bottom-[3px] right-[3px] w-[14px] h-[14px] rounded-full bg-[#639922] border-[2.5px] border-[#042C53]" />
            )}
          </div>

          {/* Name info */}
          <div className="relative z-10">
            <h2 className="text-[20px] font-semibold text-white mb-1">{user.name}</h2>
            <p className="text-[13px] text-white/45 mb-3">{user.email}</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#EF9F27]/15 text-[#EF9F27] border border-[#EF9F27]/25 tracking-wide">
                {user.role}
              </span>
              <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#639922]/15 text-[#97C459] border border-[#639922]/25">
                {user.isDeleted ? "Deleted" : "Active"}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 py-7">

          <p className="text-[10px] uppercase tracking-[0.12em] text-[#B4B2A9] font-medium mb-3">
            Account information
          </p>

          {/* 3-col */}
          <div className="grid grid-cols-3 gap-2.5 mb-2.5">
            <InfoCard label="Member Since" value={fmt(user.createdAt)} />
            <InfoCard label="Last Updated" value={fmt(user.updatedAt)} />
            <InfoCard
              label="Account Status"
              value={user.isDeleted ? "Deleted" : "Active"}
              dot={user.isDeleted ? "red" : "green"}
            />
          </div>

          {/* 2-col */}
          <div className="grid grid-cols-2 gap-2.5 mb-2.5">
            <InfoCard
              label="Email Verified"
              value={user.emailVerified ? "Verified" : "Not verified"}
              dot={user.emailVerified ? "green" : "red"}
            />
            <InfoCard
              label="Profile Image"
              value={user.image ? "Set" : "Not set"}
              muted={!user.image}
            />
          </div>

          {/* User ID dark box */}
          <div className="bg-[#042C53] rounded-2xl px-5 py-4 mb-6">
            <p className="text-[10px] uppercase tracking-widest text-[#EF9F27]/60 mb-1.5">User ID</p>
            <p className="text-[11px] text-white/55 font-mono break-all leading-relaxed">{user.id}</p>
          </div>

          <div className="h-px bg-[#042C53]/07 mb-5" />

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-5">
            <span className="text-[11px] px-4 py-1.5 rounded-full border border-[#042C53]/13 text-[#042C53]/45">
              Boshonto Hotel & Dining
            </span>
            <span className="text-[11px] px-4 py-1.5 rounded-full border border-[#042C53]/13 text-[#042C53]/45">
              Full Access
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-[#B4B2A9]">Boshonto</span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#D3D1C7]" />
            <span className="text-xs font-medium text-[#042C53]">Hotel & Dining</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-[4px] bg-gradient-to-r from-[#EF9F27] to-[#042C53]" />
      </div>
    </div>
  );
};

const InfoCard = ({
  label, value, dot, muted,
}: {
  label: string;
  value: string;
  dot?: "green" | "red";
  muted?: boolean;
}) => (
  <div className="bg-[#F1EFE8] rounded-2xl px-4 py-3.5">
    <p className="text-[10px] uppercase tracking-widest text-[#B4B2A9] mb-1.5">{label}</p>
    <p className={`text-[13px] font-medium flex items-center gap-1.5 ${muted ? "text-[#B4B2A9] font-normal" : "text-[#042C53]"}`}>
      {dot && (
        <span className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${dot === "green" ? "bg-[#639922]" : "bg-[#E24B4A]"}`} />
      )}
      {value}
    </p>
  </div>
);

export default Profile;