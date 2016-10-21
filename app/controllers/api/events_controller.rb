module Api
  class EventsController < ApplicationController
    before_action :set_event, only: [:update, :destroy]

    def index
      render json: Event.order(sort_by + ' ' + direction)
    end

    def search
      query = params[:query]
      events = Event.where("name LIKE ? OR place LIKE ? OR description LIKE ?",
                           "%#{query}%","%#{query}%","%#{query}%")
      render json: events
    end

    def create
      event = Event.new(event_params)
      if event.save
        render json: event
      else
        render nothing: true, status: :bad_request
      end
    end

    def update
      if @event.update(event_params)
        render json: @event
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def destroy
      @event.destroy
      head :no_content
    end

    private

    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:name, :place, :description, :event_date)
    end

    def sort_by
      Event.column_names.include?(params[:sort_by]) ? params[:sort_by] : "name"
    end

    def direction
      %w[asc desc].include?(params[:order]) ? params[:order] : "asc"
    end
  end
end

