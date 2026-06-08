import type { ComponentType } from "react"
import WelcomeCard from "./Welcome"
import NoEventCard from "./NoEvent"
import ServerStatusCard from "./ServerStatus"
import UserInfoCard from "./UserInfo"
import CreateBotCard from "./CreateBot"
import ControlRedstoneDigitalCard from "./ControlRedstoneDigital"
import ControlRedstoneAnalogCard from "./ControlRedstoneAnalog"
import IndicatorBarCard from "./IndicatorBar"
import IndicatorCircularCard from "./IndicatorCircular"
import AeOverviewCard from "./AeOverview"
import BotOverviewCard from "./BotOverview"

// Card registry for dynamic layout rendering
// Maps card IDs (from server layout JSON) to React components
export const cardRegistry: Record<string, ComponentType<any>> = {
  welcome: WelcomeCard,
  "no-event": NoEventCard,
  "server-status": ServerStatusCard,
  "user-info": UserInfoCard,
  "create-bot": CreateBotCard,
  "control-redstone-digital": ControlRedstoneDigitalCard,
  "control-redstone-analog": ControlRedstoneAnalogCard,
  "indicator-bar": IndicatorBarCard,
  "indicator-circular": IndicatorCircularCard,
  "ae-overview": AeOverviewCard,
  "bot-overview": BotOverviewCard,
}

// Helper to get a card component by ID
export function getCardComponent(id: string): ComponentType<any> | null {
  return cardRegistry[id] || null
}
