import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
} from '@front/shared/ui/command'
import { FaceIcon, GearIcon, PersonIcon } from '@radix-ui/react-icons'
import { CalendarIcon, RocketIcon } from 'lucide-react'

const SearchCommand = () => {
	return (
		<Command className="w-full">
			<CommandInput placeholder="Введите поисковый запрос.." />
			<CommandList className="max-h-[60rem] sm:h-auto sm:max-h-[30rem] ">
				<CommandEmpty>Результаты не найдены..</CommandEmpty>
				<CommandGroup heading="Продукты">
					<CommandItem>
						<CalendarIcon className="mr-2 h-4 w-4" />
						<span>Calendar</span>
					</CommandItem>
					<CommandItem>
						<FaceIcon className="mr-2 h-4 w-4" />
						<span>Search Emoji</span>
					</CommandItem>
					<CommandItem>
						<RocketIcon className="mr-2 h-4 w-4" />
						<span>Launch</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Общие">
					<CommandItem value="profile">
						<PersonIcon className="mr-2 h-4 w-4" />
						<span>Profile</span>
						<CommandShortcut className="sm:hidden">⌘P</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<GearIcon className="mr-2 h-4 w-4" />
						<span>Settings</span>
						<CommandShortcut className="sm:hidden">⌘S</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
export default SearchCommand
