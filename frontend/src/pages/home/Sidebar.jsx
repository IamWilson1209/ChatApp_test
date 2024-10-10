import Conversations from "../../components/sidebar/Conversations";
import LogoutButton from "../../components/sidebar/LogoutButton";
import SearchInput from "../../components/sidebar/SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;